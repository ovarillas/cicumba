/* =========================================================
   Autenticación con Supabase Auth
   ---------------------------------------------------------
   Preparado para la Fase 3. Mientras `window.cicumbaDB` sea
   null (Supabase sin configurar), el login muestra un aviso
   y no intenta autenticar.
   ========================================================= */
(function () {
  "use strict";

  const db = window.cicumbaDB;

  /* ---------------- LOGIN ---------------- */
  const loginForm = document.getElementById("loginForm");
  const loginNote = document.getElementById("loginNote");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (loginNote) loginNote.className = "form__note";

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) {
        setNote("Completa correo y contraseña.", "err");
        return;
      }

      if (!db) {
        setNote(
          "Supabase aún no está configurado (Fase 3). Revisa app/js/supabase.js.",
          "err"
        );
        return;
      }

      setNote("Ingresando...", "");
      const { error } = await db.auth.signInWithPassword({ email, password });

      if (error) {
        setNote("No se pudo iniciar sesión: " + error.message, "err");
        return;
      }
      window.location.href = "dashboard.html";
    });
  }

  function setNote(msg, type) {
    if (!loginNote) return;
    loginNote.textContent = msg;
    loginNote.className = "form__note" + (type ? " " + type : "");
  }

  /* ---------------- GUARD + LOGOUT (dashboard) ---------------- */
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmailEl = document.getElementById("userEmail");
  const isDashboard = !!logoutBtn || !!userEmailEl;

  if (isDashboard && db) {
    // Proteger la ruta: si no hay sesión, volver al login.
    db.auth.getSession().then(function (res) {
      const session = res.data.session;
      if (!session) {
        window.location.href = "login.html";
        return;
      }
      if (userEmailEl) userEmailEl.textContent = session.user.email || "";
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async function () {
        await db.auth.signOut();
        window.location.href = "login.html";
      });
    }
  } else if (isDashboard && !db) {
    if (userEmailEl) userEmailEl.textContent = "(demo · sin Supabase)";
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html";
      });
    }
  }
})();
