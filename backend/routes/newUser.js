import express from 'express';
import validNewUser from '../utils/validNewUser.js';
const router = express.Router();

import { supabase } from '../index.js';

// New User
router.post("/new_user", async (req, res) => {
  const { email, password, role, name } = req.body;

  // Validate the new user request
  const { result, message } = await validNewUser(req);

  if (!result) {
    return res.status(400).json({ error: message });
  }

  try {
    // Insert the new user into the database
    const { error: insertError } = await supabase
      .from('user')
      .insert({
        email: email,
        password: password,
        role: role,
        name: name,
      });

    if (insertError) {
      console.error("Supabase error:", insertError);
      return res.status(500).json({ error: "Supabase insert failed" });
    }

    // Respond with success
    res.status(200).json({ message: 'Successfully created new user' });

  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Failed to create new user" });
  }
});

export default router;