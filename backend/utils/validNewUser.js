import { supabase } from "../index.js";

async function validNewUser(newUserDetail) {
    const { email, password, role, name } = newUserDetail.body;

    const {data, error} = await supabase
      .from('user')
      .select('*')
      .eq('email', email);

    if (error) {
        console.error("Supabase error:", error);
        return { result: false, message: 'Supabase error' };
    }

    if (data.length > 0) {
        return { result: false, message: 'User email already exists' };
    }

    if (role !== 'admin' && role !== 'student') {
        return { result: false, message: 'Invalid role' };
    }

    return true;
}

export default validNewUser;