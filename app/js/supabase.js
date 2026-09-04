/* =========================================================
   Configuración de conexión a Supabase
   ---------------------------------------------------------
   GitHub Pages es estático: la clave "anon" queda visible en
   el código. Eso es NORMAL y esperado. La seguridad real se
   consigue configurando políticas RLS (Row Level Security)
   en el panel de Supabase.

   Reemplaza SUPABASE_URL y SUPABASE_ANON_KEY con los valores
   de tu proyecto (Supabase > Project Settings > API).
   ========================================================= */

const SUPABASE_URL = "https://TU-PROYECTO.supabase.co";     // TODO
const SUPABASE_ANON_KEY = "TU_CLAVE_ANON_PUBLICA";          // TODO

// El objeto global `supabase` lo provee el script CDN cargado en el HTML.
// Creamos el cliente solo si las credenciales fueron configuradas.
let db = null;

(function initSupabase() {
  const configurado =
    typeof window.supabase !== "undefined" &&
    SUPABASE_URL.indexOf("TU-PROYECTO") === -1 &&
    SUPABASE_ANON_KEY.indexOf("TU_CLAVE") === -1;

  if (configurado) {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.info("[Cicumba] Supabase conectado.");
  } else {
    console.warn(
      "[Cicumba] Supabase aún no configurado. " +
        "Edita app/js/supabase.js con la URL y la clave anon (Fase 2/3)."
    );
  }
})();

// Exponer el cliente para los demás módulos
window.cicumbaDB = db;
