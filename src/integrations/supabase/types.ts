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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      publication_admins: {
        Row: {
          created_at: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_admins_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_articles: {
        Row: {
          active_run_id: string | null
          category: string | null
          cluster: string | null
          content_hash: string | null
          created_at: string
          cta_variant: string | null
          deployment_id: string | null
          final_title: string | null
          id: string
          last_error_category: string | null
          last_error_summary: string | null
          live_url: string | null
          lock_expires_at: string | null
          lock_token: string | null
          locked_at: string | null
          locked_by: string | null
          notification_status: Database["public"]["Enums"]["publication_notification_status"]
          original_title: string
          phase: Database["public"]["Enums"]["publication_phase"] | null
          planning_number: number
          primary_keyword: string | null
          project_id: string
          published_at: string | null
          retry_count: number
          scheduled_at: string | null
          slug: string | null
          source_metadata: Json
          started_at: string | null
          status: Database["public"]["Enums"]["publication_article_status"]
          updated_at: string
        }
        Insert: {
          active_run_id?: string | null
          category?: string | null
          cluster?: string | null
          content_hash?: string | null
          created_at?: string
          cta_variant?: string | null
          deployment_id?: string | null
          final_title?: string | null
          id?: string
          last_error_category?: string | null
          last_error_summary?: string | null
          live_url?: string | null
          lock_expires_at?: string | null
          lock_token?: string | null
          locked_at?: string | null
          locked_by?: string | null
          notification_status?: Database["public"]["Enums"]["publication_notification_status"]
          original_title: string
          phase?: Database["public"]["Enums"]["publication_phase"] | null
          planning_number: number
          primary_keyword?: string | null
          project_id: string
          published_at?: string | null
          retry_count?: number
          scheduled_at?: string | null
          slug?: string | null
          source_metadata?: Json
          started_at?: string | null
          status?: Database["public"]["Enums"]["publication_article_status"]
          updated_at?: string
        }
        Update: {
          active_run_id?: string | null
          category?: string | null
          cluster?: string | null
          content_hash?: string | null
          created_at?: string
          cta_variant?: string | null
          deployment_id?: string | null
          final_title?: string | null
          id?: string
          last_error_category?: string | null
          last_error_summary?: string | null
          live_url?: string | null
          lock_expires_at?: string | null
          lock_token?: string | null
          locked_at?: string | null
          locked_by?: string | null
          notification_status?: Database["public"]["Enums"]["publication_notification_status"]
          original_title?: string
          phase?: Database["public"]["Enums"]["publication_phase"] | null
          planning_number?: number
          primary_keyword?: string | null
          project_id?: string
          published_at?: string | null
          retry_count?: number
          scheduled_at?: string | null
          slug?: string | null
          source_metadata?: Json
          started_at?: string | null
          status?: Database["public"]["Enums"]["publication_article_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_articles_active_run_id_fkey"
            columns: ["active_run_id"]
            isOneToOne: false
            referencedRelation: "publication_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_articles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_events: {
        Row: {
          actor_id: string | null
          actor_type: string
          article_id: string | null
          created_at: string
          event_type: string
          id: number
          payload: Json
          project_id: string
          reason: string | null
          run_id: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_type: string
          article_id?: string | null
          created_at?: string
          event_type: string
          id?: never
          payload?: Json
          project_id: string
          reason?: string | null
          run_id?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_type?: string
          article_id?: string | null
          created_at?: string
          event_type?: string
          id?: never
          payload?: Json
          project_id?: string
          reason?: string | null
          run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publication_events_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "publication_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_events_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "publication_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_notifications: {
        Row: {
          article_id: string | null
          attempt_count: number
          created_at: string
          external_message_id: string | null
          id: string
          idempotency_key: string
          last_error: string | null
          notification_type: Database["public"]["Enums"]["publication_notification_type"]
          project_id: string
          recipient: string
          run_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["publication_notification_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          article_id?: string | null
          attempt_count?: number
          created_at?: string
          external_message_id?: string | null
          id?: string
          idempotency_key: string
          last_error?: string | null
          notification_type: Database["public"]["Enums"]["publication_notification_type"]
          project_id: string
          recipient: string
          run_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["publication_notification_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          article_id?: string | null
          attempt_count?: number
          created_at?: string
          external_message_id?: string | null
          id?: string
          idempotency_key?: string
          last_error?: string | null
          notification_type?: Database["public"]["Enums"]["publication_notification_type"]
          project_id?: string
          recipient?: string
          run_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["publication_notification_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_notifications_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "publication_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_notifications_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "publication_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_projects: {
        Row: {
          active_instruction_versions: Json
          automation_enabled: boolean
          created_at: string
          end_notification_sent_at: string | null
          id: string
          knowledge_base_path: string
          max_step_attempts: number
          name: string
          notification_recipient: string | null
          production_origin: string | null
          project_key: string
          publication_stopped: boolean
          stopped_at: string | null
          stopped_reason: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          active_instruction_versions?: Json
          automation_enabled?: boolean
          created_at?: string
          end_notification_sent_at?: string | null
          id?: string
          knowledge_base_path?: string
          max_step_attempts?: number
          name: string
          notification_recipient?: string | null
          production_origin?: string | null
          project_key: string
          publication_stopped?: boolean
          stopped_at?: string | null
          stopped_reason?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          active_instruction_versions?: Json
          automation_enabled?: boolean
          created_at?: string
          end_notification_sent_at?: string | null
          id?: string
          knowledge_base_path?: string
          max_step_attempts?: number
          name?: string
          notification_recipient?: string | null
          production_origin?: string | null
          project_key?: string
          publication_stopped?: boolean
          stopped_at?: string | null
          stopped_reason?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      publication_qa_checks: {
        Row: {
          article_id: string
          blocking: boolean
          check_key: string
          checked_at: string
          evidence: Json
          id: string
          project_id: string
          result: Database["public"]["Enums"]["publication_check_result"]
          run_id: string
          stage: Database["public"]["Enums"]["publication_qa_stage"]
          summary: string
        }
        Insert: {
          article_id: string
          blocking?: boolean
          check_key: string
          checked_at?: string
          evidence?: Json
          id?: string
          project_id: string
          result: Database["public"]["Enums"]["publication_check_result"]
          run_id: string
          stage: Database["public"]["Enums"]["publication_qa_stage"]
          summary: string
        }
        Update: {
          article_id?: string
          blocking?: boolean
          check_key?: string
          checked_at?: string
          evidence?: Json
          id?: string
          project_id?: string
          result?: Database["public"]["Enums"]["publication_check_result"]
          run_id?: string
          stage?: Database["public"]["Enums"]["publication_qa_stage"]
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_qa_checks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "publication_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_qa_checks_check_key_stage_fkey"
            columns: ["check_key", "stage"]
            isOneToOne: false
            referencedRelation: "publication_required_qa_checks"
            referencedColumns: ["check_key", "stage"]
          },
          {
            foreignKeyName: "publication_qa_checks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_qa_checks_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "publication_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_required_qa_checks: {
        Row: {
          check_key: string
          description: string
          stage: Database["public"]["Enums"]["publication_qa_stage"]
        }
        Insert: {
          check_key: string
          description: string
          stage: Database["public"]["Enums"]["publication_qa_stage"]
        }
        Update: {
          check_key?: string
          description?: string
          stage?: Database["public"]["Enums"]["publication_qa_stage"]
        }
        Relationships: []
      }
      publication_runs: {
        Row: {
          article_id: string | null
          created_at: string
          created_by: string | null
          current_step: string
          error_category: string | null
          error_details: Json
          error_summary: string | null
          final_status: Database["public"]["Enums"]["publication_run_status"]
          finished_at: string | null
          id: string
          parent_run_id: string | null
          phase: Database["public"]["Enums"]["publication_phase"] | null
          project_id: string
          scheduled_for: string | null
          scheduler_slot:
            | Database["public"]["Enums"]["publication_scheduler_slot"]
            | null
          source_snapshot: Json
          started_at: string
          trigger_type: Database["public"]["Enums"]["publication_trigger_type"]
          updated_at: string
          warnings: Json
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          created_by?: string | null
          current_step?: string
          error_category?: string | null
          error_details?: Json
          error_summary?: string | null
          final_status?: Database["public"]["Enums"]["publication_run_status"]
          finished_at?: string | null
          id?: string
          parent_run_id?: string | null
          phase?: Database["public"]["Enums"]["publication_phase"] | null
          project_id: string
          scheduled_for?: string | null
          scheduler_slot?:
            | Database["public"]["Enums"]["publication_scheduler_slot"]
            | null
          source_snapshot?: Json
          started_at?: string
          trigger_type: Database["public"]["Enums"]["publication_trigger_type"]
          updated_at?: string
          warnings?: Json
        }
        Update: {
          article_id?: string | null
          created_at?: string
          created_by?: string | null
          current_step?: string
          error_category?: string | null
          error_details?: Json
          error_summary?: string | null
          final_status?: Database["public"]["Enums"]["publication_run_status"]
          finished_at?: string | null
          id?: string
          parent_run_id?: string | null
          phase?: Database["public"]["Enums"]["publication_phase"] | null
          project_id?: string
          scheduled_for?: string | null
          scheduler_slot?:
            | Database["public"]["Enums"]["publication_scheduler_slot"]
            | null
          source_snapshot?: Json
          started_at?: string
          trigger_type?: Database["public"]["Enums"]["publication_trigger_type"]
          updated_at?: string
          warnings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "publication_runs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "publication_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_runs_parent_run_id_fkey"
            columns: ["parent_run_id"]
            isOneToOne: false
            referencedRelation: "publication_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "publication_projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_mark_article: {
        Args: {
          p_article_id: string
          p_new_status: Database["public"]["Enums"]["publication_article_status"]
          p_reason?: string
        }
        Returns: undefined
      }
      admin_release_stale_lock: {
        Args: { p_article_id: string; p_reason?: string }
        Returns: undefined
      }
      admin_set_automation: {
        Args: { p_enabled: boolean; p_project_key: string; p_reason?: string }
        Returns: undefined
      }
      admin_stop_publication: {
        Args: { p_project_key: string; p_reason: string }
        Returns: undefined
      }
      backfill_pilot_articles: { Args: never; Returns: undefined }
      bootstrap_first_admin: {
        Args: { p_project_key?: string }
        Returns: {
          project_id: string
          user_id: string
        }[]
      }
      current_user_is_any_publication_admin: { Args: never; Returns: boolean }
      import_publication_planning: {
        Args: { p_dry_run?: boolean; p_project_key: string; p_rows: Json }
        Returns: {
          action: string
          original_title: string
          planning_number: number
        }[]
      }
      is_publication_admin: { Args: { p_project_id: string }; Returns: boolean }
    }
    Enums: {
      publication_article_status:
        | "planned"
        | "locked"
        | "drafting"
        | "validating"
        | "building"
        | "preview_check"
        | "publishing"
        | "live_check"
        | "published"
        | "retry_pending"
        | "failed"
        | "blocked"
      publication_check_result: "pass" | "fail" | "not_applicable"
      publication_notification_status:
        | "not_started"
        | "pending"
        | "sending"
        | "sent"
        | "failed"
        | "not_required"
      publication_notification_type: "success" | "failure" | "end_of_series"
      publication_phase: "phase_1_36" | "phase_37_60" | "phase_61_180"
      publication_qa_stage: "content" | "preview" | "live"
      publication_run_status:
        | "running"
        | "published"
        | "retry_pending"
        | "failed"
        | "blocked"
        | "scheduled_noop"
        | "stopped_noop"
        | "configuration_blocked"
        | "cancelled"
      publication_scheduler_slot: "monday" | "wednesday" | "friday"
      publication_trigger_type: "scheduled" | "retry" | "manual" | "migration"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      publication_article_status: [
        "planned",
        "locked",
        "drafting",
        "validating",
        "building",
        "preview_check",
        "publishing",
        "live_check",
        "published",
        "retry_pending",
        "failed",
        "blocked",
      ],
      publication_check_result: ["pass", "fail", "not_applicable"],
      publication_notification_status: [
        "not_started",
        "pending",
        "sending",
        "sent",
        "failed",
        "not_required",
      ],
      publication_notification_type: ["success", "failure", "end_of_series"],
      publication_phase: ["phase_1_36", "phase_37_60", "phase_61_180"],
      publication_qa_stage: ["content", "preview", "live"],
      publication_run_status: [
        "running",
        "published",
        "retry_pending",
        "failed",
        "blocked",
        "scheduled_noop",
        "stopped_noop",
        "configuration_blocked",
        "cancelled",
      ],
      publication_scheduler_slot: ["monday", "wednesday", "friday"],
      publication_trigger_type: ["scheduled", "retry", "manual", "migration"],
    },
  },
} as const
