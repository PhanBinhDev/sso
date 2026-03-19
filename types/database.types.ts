export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      ai_advisor_analyses: {
        Row: {
          created_at: string | null
          id: string
          mission_control_action: string
          mission_control_data: Json | null
          mission_control_type: string | null
          month: string
          profit_protector_action: string
          profit_protector_data: Json | null
          profit_protector_type: string | null
          status_summary: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          mission_control_action: string
          mission_control_data?: Json | null
          mission_control_type?: string | null
          month: string
          profit_protector_action: string
          profit_protector_data?: Json | null
          profit_protector_type?: string | null
          status_summary: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          mission_control_action?: string
          mission_control_data?: Json | null
          mission_control_type?: string | null
          month?: string
          profit_protector_action?: string
          profit_protector_data?: Json | null
          profit_protector_type?: string | null
          status_summary?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_key: string
          created_at: string | null
          default_language_name: string
          id: string
          name: string
          parent_category: string | null
          type: string
          user_id: string
        }
        Insert: {
          category_key: string
          created_at?: string | null
          default_language_name: string
          id?: string
          name: string
          parent_category?: string | null
          type: string
          user_id: string
        }
        Update: {
          category_key?: string
          created_at?: string | null
          default_language_name?: string
          id?: string
          name?: string
          parent_category?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'categories_parent_category_fkey'
            columns: ['parent_category']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      category_aliases: {
        Row: {
          alias: string
          canonical_category: string
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          alias: string
          canonical_category: string
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          alias?: string
          canonical_category?: string
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      currency_rates: {
        Row: {
          created_at: string | null
          from_currency: string
          id: string
          rate: number
          rate_date: string
          to_currency: string
        }
        Insert: {
          created_at?: string | null
          from_currency: string
          id?: string
          rate: number
          rate_date: string
          to_currency: string
        }
        Update: {
          created_at?: string | null
          from_currency?: string
          id?: string
          rate?: number
          rate_date?: string
          to_currency?: string
        }
        Relationships: []
      }
      data_exports: {
        Row: {
          completed_at: string | null
          expires_at: string | null
          file_url: string | null
          id: string
          requested_at: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          expires_at?: string | null
          file_url?: string | null
          id?: string
          requested_at?: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          expires_at?: string | null
          file_url?: string | null
          id?: string
          requested_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      expense_targets: {
        Row: {
          category_id: string | null
          created_at: string | null
          goal_id: string | null
          id: string
          percentage: number
          target_amount: number
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          goal_id?: string | null
          id?: string
          percentage: number
          target_amount: number
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          goal_id?: string | null
          id?: string
          percentage?: number
          target_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: 'expense_targets_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'expense_targets_goal_id_fkey'
            columns: ['goal_id']
            isOneToOne: false
            referencedRelation: 'profit_protector_goals'
            referencedColumns: ['id']
          }
        ]
      }
      i18n_translations: {
        Row: {
          created_at: string | null
          id: string
          key: string
          language_code: string
          scope: string | null
          user_id: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          language_code: string
          scope?: string | null
          user_id?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          language_code?: string
          scope?: string | null
          user_id?: string | null
          value?: string
        }
        Relationships: []
      }
      learned_category_rules: {
        Row: {
          confidence: number | null
          created_at: string
          description_pattern: string | null
          id: number
          last_applied_at: string | null
          merchant_normalized: string | null
          rule_origin: string | null
          rule_type: string
          sample_transaction_id: string | null
          source_category: string | null
          target_category_id: string | null
          updated_at: string
          usage_count: number
          user_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          description_pattern?: string | null
          id?: number
          last_applied_at?: string | null
          merchant_normalized?: string | null
          rule_origin?: string | null
          rule_type?: string
          sample_transaction_id?: string | null
          source_category?: string | null
          target_category_id?: string | null
          updated_at?: string
          usage_count?: number
          user_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          description_pattern?: string | null
          id?: number
          last_applied_at?: string | null
          merchant_normalized?: string | null
          rule_origin?: string | null
          rule_type?: string
          sample_transaction_id?: string | null
          source_category?: string | null
          target_category_id?: string | null
          updated_at?: string
          usage_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'lcr_target_category_fkey'
            columns: ['target_category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      metric_results: {
        Row: {
          created_at: string | null
          id: string
          metric_id: string | null
          month: string
          user_id: string
          value: number
          week_number: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          metric_id?: string | null
          month: string
          user_id: string
          value: number
          week_number: number
        }
        Update: {
          created_at?: string | null
          id?: string
          metric_id?: string | null
          month?: string
          user_id?: string
          value?: number
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: 'metric_results_metric_id_fkey'
            columns: ['metric_id']
            isOneToOne: false
            referencedRelation: 'mission_metrics'
            referencedColumns: ['id']
          }
        ]
      }
      mission_metrics: {
        Row: {
          aggregation_type: string
          created_at: string | null
          id: string
          name: string
          owner: string
          phase: string
          sort_order: number
          status: string | null
          target: number
          user_id: string
        }
        Insert: {
          aggregation_type?: string
          created_at?: string | null
          id?: string
          name: string
          owner: string
          phase: string
          sort_order?: number
          status?: string | null
          target: number
          user_id: string
        }
        Update: {
          aggregation_type?: string
          created_at?: string | null
          id?: string
          name?: string
          owner?: string
          phase?: string
          sort_order?: number
          status?: string | null
          target?: number
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: string
          created_at: string | null
          currency: string
          id: string
          mollie_customer_id: string | null
          mollie_invoice_id: string | null
          mollie_payment_id: string
          mollie_subscription_id: string | null
          plan: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: string
          created_at?: string | null
          currency?: string
          id?: string
          mollie_customer_id?: string | null
          mollie_invoice_id?: string | null
          mollie_payment_id: string
          mollie_subscription_id?: string | null
          plan: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: string
          created_at?: string | null
          currency?: string
          id?: string
          mollie_customer_id?: string | null
          mollie_invoice_id?: string | null
          mollie_payment_id?: string
          mollie_subscription_id?: string | null
          plan?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      platform_config: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          key: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          key?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          key?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profit_protector_goals: {
        Row: {
          created_at: string | null
          id: string
          month: string
          target_profit_amount: number
          target_profit_margin: number
          target_revenue: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          month: string
          target_profit_amount: number
          target_profit_margin: number
          target_revenue: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          month?: string
          target_profit_amount?: number
          target_profit_margin?: number
          target_revenue?: number
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          uses_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          uses_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          uses_count?: number | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          accepted_at: string | null
          admin_id: string
          can_edit_journal: boolean | null
          can_edit_mission_control: boolean | null
          can_view_journal: boolean | null
          can_view_mission_control: boolean | null
          can_view_monthly: boolean | null
          can_view_profit_protector: boolean | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          invitation_expires_at: string | null
          invitation_token: string | null
          invited_at: string | null
          user_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          admin_id: string
          can_edit_journal?: boolean | null
          can_edit_mission_control?: boolean | null
          can_view_journal?: boolean | null
          can_view_mission_control?: boolean | null
          can_view_monthly?: boolean | null
          can_view_profit_protector?: boolean | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          invitation_expires_at?: string | null
          invitation_token?: string | null
          invited_at?: string | null
          user_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          admin_id?: string
          can_edit_journal?: boolean | null
          can_edit_mission_control?: boolean | null
          can_view_journal?: boolean | null
          can_view_mission_control?: boolean | null
          can_view_monthly?: boolean | null
          can_view_profit_protector?: boolean | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          invitation_expires_at?: string | null
          invitation_token?: string | null
          invited_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'team_members_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'team_members_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'user_profiles_billing'
            referencedColumns: ['id']
          }
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string | null
          currency: string
          date: string
          description: string
          fiscal_month: string | null
          id: string
          is_recurring: boolean
          language_code: string
          source: string
          type: string | null
          user_id: string
          user_region: string | null
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string | null
          currency?: string
          date: string
          description: string
          fiscal_month?: string | null
          id?: string
          is_recurring?: boolean
          language_code?: string
          source?: string
          type?: string | null
          user_id: string
          user_region?: string | null
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string | null
          currency?: string
          date?: string
          description?: string
          fiscal_month?: string | null
          id?: string
          is_recurring?: boolean
          language_code?: string
          source?: string
          type?: string | null
          user_id?: string
          user_region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      user_badges: {
        Row: {
          badge_type: string
          created_at: string | null
          id: string
          months_achieved: number | null
          months_total: number | null
          updated_at: string | null
          user_id: string
          year: number
        }
        Insert: {
          badge_type: string
          created_at?: string | null
          id?: string
          months_achieved?: number | null
          months_total?: number | null
          updated_at?: string | null
          user_id: string
          year?: number
        }
        Update: {
          badge_type?: string
          created_at?: string | null
          id?: string
          months_achieved?: number | null
          months_total?: number | null
          updated_at?: string | null
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      user_category_actions: {
        Row: {
          created_at: string
          description_raw: string | null
          id: number
          merchant_normalized: string | null
          merchant_raw: string | null
          new_category: string | null
          previous_category: string | null
          reason: string | null
          transaction_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description_raw?: string | null
          id?: number
          merchant_normalized?: string | null
          merchant_raw?: string | null
          new_category?: string | null
          previous_category?: string | null
          reason?: string | null
          transaction_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          description_raw?: string | null
          id?: number
          merchant_normalized?: string | null
          merchant_raw?: string | null
          new_category?: string | null
          previous_category?: string | null
          reason?: string | null
          transaction_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'uca_new_category_fkey'
            columns: ['new_category']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'uca_previous_category_fkey'
            columns: ['previous_category']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          }
        ]
      }
      user_platforms: {
        Row: {
          created_at: string | null
          first_access_at: string | null
          id: number
          last_access_at: string | null
          platform: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          first_access_at?: string | null
          id?: number
          last_access_at?: string | null
          platform?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          first_access_at?: string | null
          id?: number
          last_access_at?: string | null
          platform?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_locked_until: string | null
          billing_city: string | null
          billing_city_encrypted: string | null
          billing_company: string | null
          billing_company_encrypted: string | null
          billing_country: string | null
          billing_name: string | null
          billing_name_encrypted: string | null
          billing_postal_code: string | null
          billing_postal_code_encrypted: string | null
          billing_street: string | null
          billing_street_encrypted: string | null
          company_name: string | null
          created_at: string | null
          email: string
          full_name: string | null
          has_completed_tour: boolean | null
          id: string
          is_admin: boolean | null
          kit_contact_id: string | null
          kit_subscribed: boolean | null
          kit_tag_id: string | null
          kit_tag_type: string | null
          language: string
          mfa_enabled: boolean
          mollie_customer_id: string | null
          mollie_subscription_id: string | null
          os49_user_id: string | null
          password_changed_at: string | null
          plan: string | null
          plan_status: string | null
          profile_photo_url: string | null
          promo_code_used: string | null
          updated_at: string | null
        }
        Insert: {
          account_locked_until?: string | null
          billing_city?: string | null
          billing_city_encrypted?: string | null
          billing_company?: string | null
          billing_company_encrypted?: string | null
          billing_country?: string | null
          billing_name?: string | null
          billing_name_encrypted?: string | null
          billing_postal_code?: string | null
          billing_postal_code_encrypted?: string | null
          billing_street?: string | null
          billing_street_encrypted?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          has_completed_tour?: boolean | null
          id: string
          is_admin?: boolean | null
          kit_contact_id?: string | null
          kit_subscribed?: boolean | null
          kit_tag_id?: string | null
          kit_tag_type?: string | null
          language?: string
          mfa_enabled?: boolean
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          os49_user_id?: string | null
          password_changed_at?: string | null
          plan?: string | null
          plan_status?: string | null
          profile_photo_url?: string | null
          promo_code_used?: string | null
          updated_at?: string | null
        }
        Update: {
          account_locked_until?: string | null
          billing_city?: string | null
          billing_city_encrypted?: string | null
          billing_company?: string | null
          billing_company_encrypted?: string | null
          billing_country?: string | null
          billing_name?: string | null
          billing_name_encrypted?: string | null
          billing_postal_code?: string | null
          billing_postal_code_encrypted?: string | null
          billing_street?: string | null
          billing_street_encrypted?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          has_completed_tour?: boolean | null
          id?: string
          is_admin?: boolean | null
          kit_contact_id?: string | null
          kit_subscribed?: boolean | null
          kit_tag_id?: string | null
          kit_tag_type?: string | null
          language?: string
          mfa_enabled?: boolean
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          os49_user_id?: string | null
          password_changed_at?: string | null
          plan?: string | null
          plan_status?: string | null
          profile_photo_url?: string | null
          promo_code_used?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          expires_at: string
          id: string
          ip_address: string | null
          is_active: boolean
          last_active_at: string
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          expires_at: string
          id?: string
          ip_address?: string | null
          is_active?: boolean
          last_active_at?: string
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          is_active?: boolean
          last_active_at?: string
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_entry_date: string | null
          longest_streak: number | null
          total_entries: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_entry_date?: string | null
          longest_streak?: number | null
          total_entries?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_entry_date?: string | null
          longest_streak?: number | null
          total_entries?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_profiles_billing: {
        Row: {
          billing_city: string | null
          billing_company: string | null
          billing_country: string | null
          billing_name: string | null
          billing_postal_code: string | null
          billing_street: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          is_admin: boolean | null
          mollie_customer_id: string | null
          mollie_subscription_id: string | null
          plan: string | null
          profile_photo_url: string | null
          updated_at: string | null
        }
        Insert: {
          billing_city?: never
          billing_company?: never
          billing_country?: string | null
          billing_name?: never
          billing_postal_code?: never
          billing_street?: never
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string | null
          is_admin?: boolean | null
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          plan?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_city?: never
          billing_company?: never
          billing_country?: string | null
          billing_name?: never
          billing_postal_code?: never
          billing_street?: never
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string | null
          is_admin?: boolean | null
          mollie_customer_id?: string | null
          mollie_subscription_id?: string | null
          plan?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      v_category_monthly_summary: {
        Row: {
          category_key: string | null
          expenses: number | null
          month: string | null
          revenue: number | null
          type: string | null
          user_id: string | null
        }
        Relationships: []
      }
      v_monthly_summary: {
        Row: {
          expenses: number | null
          month: string | null
          profit: number | null
          revenue: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_expired_sessions: { Args: never; Returns: undefined }
      decrypt_billing_field: { Args: { ciphertext: string }; Returns: string }
      delete_user: { Args: never; Returns: undefined }
      encrypt_billing_field: { Args: { plaintext: string }; Returns: string }
      get_billing_encryption_key: { Args: never; Returns: string }
      has_team_edit_permission: {
        Args: { admin_user_id: string; permission: string }
        Returns: boolean
      }
      has_team_permission: {
        Args: { admin_user_id: string; permission: string }
        Returns: boolean
      }
      is_team_member_of: { Args: { admin_user_id: string }; Returns: boolean }
      log_audit_event: {
        Args: {
          p_action: string
          p_details?: Json
          p_resource_id?: string
          p_resource_type?: string
          p_user_id: string
        }
        Returns: undefined
      }
      normalize_merchant: { Args: { input: string }; Returns: string }
      redeem_promo_code: {
        Args: { p_code: string; p_user_id: string }
        Returns: Json
      }
      rpc_get_category_breakdown: {
        Args: { p_month: string }
        Returns: {
          amount: number
          category_key: string
          default_language_name: string
          type: string
        }[]
      }
      rpc_get_monthly_totals: {
        Args: { p_month: string }
        Returns: {
          expenses: number
          month: string
          profit: number
          revenue: number
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { '': string }; Returns: string[] }
      update_login_streak: { Args: { p_user_id: string }; Returns: Json }
      upsert_learned_rule:
        | {
            Args: {
              p_confidence?: number
              p_merchant_normalized: string
              p_rule_origin?: string
              p_target_category_id: string
              p_user_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_description: string
              p_merchant_raw: string
              p_new_category: string
              p_sample_transaction_id: string
              p_user_id: string
            }
            Returns: undefined
          }
      validate_invitation_acceptance: {
        Args: { p_invitation_token: string; p_user_email: string }
        Returns: {
          error_message: string
          is_valid: boolean
          team_member_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  sso: {
    Tables: {
      clients: {
        Row: {
          client_id: string
          client_name: string
          created_at: string
          is_active: boolean
          redirect_uris: string[]
          schema_name: string
          secret_hash: string
        }
        Insert: {
          client_id: string
          client_name: string
          created_at?: string
          is_active?: boolean
          redirect_uris: string[]
          schema_name: string
          secret_hash: string
        }
        Update: {
          client_id?: string
          client_name?: string
          created_at?: string
          is_active?: boolean
          redirect_uris?: string[]
          schema_name?: string
          secret_hash?: string
        }
        Relationships: []
      }
      codes: {
        Row: {
          client_id: string
          code: string
          created_at: string
          expires_at: string
          used: boolean
          user_id: string
        }
        Insert: {
          client_id: string
          code?: string
          created_at?: string
          expires_at?: string
          used?: boolean
          user_id: string
        }
        Update: {
          client_id?: string
          code?: string
          created_at?: string
          expires_at?: string
          used?: boolean
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_code: {
        Args: { p_client_id: string; p_code: string }
        Returns: {
          schema_name: string
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {}
  },
  sso: {
    Enums: {}
  }
} as const
