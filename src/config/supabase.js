
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rgbiorinhvfpbeaghpcw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYmlvcmluaHZmcGJlYWdocGN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzAxMTE4OCwiZXhwIjoyMDc4NTg3MTg4fQ.WntoIPdp4xonwJiPlw8fwUOkgOQzih_RQt7-ohxRdtg"; // Use service key for backend only

export const supabase = createClient(supabaseUrl, supabaseKey);
