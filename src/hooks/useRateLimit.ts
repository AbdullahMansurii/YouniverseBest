import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useRateLimit(actionType: string, maxAttempts: number, windowMs: number) {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts)

  useEffect(() => {
    checkCurrentRateLimit()
  }, [actionType])

  const checkCurrentRateLimit = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) return

      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('action_type', actionType)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error checking rate limit:', error)
        return
      }

      if (data) {
        const now = new Date()
        const resetTime = new Date(data.reset_at)
        
        if (now < resetTime && data.attempt_count >= maxAttempts) {
          setIsRateLimited(true)
          setAttemptsLeft(0)
        } else if (now >= resetTime) {
          // Reset the rate limit
          await supabase
            .from('rate_limits')
            .update({
              attempt_count: 0,
              last_attempt: now.toISOString(),
              reset_at: new Date(now.getTime() + windowMs).toISOString()
            })
            .eq('id', data.id)
          
          setIsRateLimited(false)
          setAttemptsLeft(maxAttempts)
        } else {
          setAttemptsLeft(maxAttempts - data.attempt_count)
        }
      } else {
        setAttemptsLeft(maxAttempts)
      }
    } catch (error) {
      console.error('Error checking rate limit:', error)
    }
  }

  const checkRateLimit = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('User not authenticated')

      const now = new Date()
      const resetTime = new Date(now.getTime() + windowMs)

      // Try to get existing rate limit record
      const { data: existing, error: fetchError } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('action_type', actionType)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (existing) {
        const currentResetTime = new Date(existing.reset_at)
        
        if (now >= currentResetTime) {
          // Reset the counter
          await supabase
            .from('rate_limits')
            .update({
              attempt_count: 1,
              last_attempt: now.toISOString(),
              reset_at: resetTime.toISOString()
            })
            .eq('id', existing.id)
          
          setAttemptsLeft(maxAttempts - 1)
        } else {
          // Increment the counter
          const newCount = existing.attempt_count + 1
          
          if (newCount > maxAttempts) {
            setIsRateLimited(true)
            setAttemptsLeft(0)
            throw new Error('Rate limit exceeded')
          }
          
          await supabase
            .from('rate_limits')
            .update({
              attempt_count: newCount,
              last_attempt: now.toISOString()
            })
            .eq('id', existing.id)
          
          setAttemptsLeft(maxAttempts - newCount)
        }
      } else {
        // Create new rate limit record
        await supabase
          .from('rate_limits')
          .insert({
            user_id: user.user.id,
            action_type: actionType,
            attempt_count: 1,
            last_attempt: now.toISOString(),
            reset_at: resetTime.toISOString()
          })
        
        setAttemptsLeft(maxAttempts - 1)
      }
    } catch (error) {
      console.error('Error updating rate limit:', error)
      throw error
    }
  }

  return {
    isRateLimited,
    attemptsLeft,
    checkRateLimit,
    checkCurrentRateLimit
  }
}