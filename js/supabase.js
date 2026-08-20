const SUPABASE_URL = "https://cvofgrvazlgwjgrhmtmq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hJIZX8k5dsRd8ux_MRkWVw_IOEZneSR";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function initAnonymousUser() {
  console.log("Iniciando login anônimo...");

  const { data: sessionData, error: sessionError } =
    await supabaseClient.auth.getSession();

  console.log("Session:", sessionData, sessionError);

  if (sessionData.session) {
    console.log("Usuário já logado:", sessionData.session.user.id);
    return sessionData.session.user;
  }

  const { data, error } = await supabaseClient.auth.signInAnonymously();

  console.log("Anonymous result:", data, error);

  if (error) {
    console.error("Erro no login anônimo:", error);
    return null;
  }

  console.log("Novo usuário anônimo:", data.user.id);
  return data.user;
}

initAnonymousUser();