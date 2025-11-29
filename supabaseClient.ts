import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgocwyobybilkcmqzpou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnb2N3eW9ieWJpbGtjbXF6cG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMTI1MTUsImV4cCI6MjA3OTg4ODUxNX0.wJv4I6vfSema2NR5rjpVNE2_sjo5IjLODSSvcXTq26k';

export const supabase = createClient(supabaseUrl, supabaseKey);