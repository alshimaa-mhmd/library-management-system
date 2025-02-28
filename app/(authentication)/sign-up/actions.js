'use server';
import { createClients } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData) {
    const supabase = await createClients();

    // Get user input from form
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = formData.get('full_name');
    const studentId = formData.get('student_id');

    // Sign up user
    const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("Signup error:", error.message);
        redirect('/error');
    }

    // Get user ID after successful signup
    const user = authData?.user;
    if (user) {
        // Insert extra data into 'profiles' table
        const { error: profileError } = await supabase.from("profiles").insert([
            {
                id: user.id,  // Use the same ID as auth.users
                full_name: fullName,
                student_id: studentId,
            },
        ]);

        if (profileError) {
            console.error("Profile insertion error:", profileError.message);
        }
    }

    redirect('/auth'); // Redirect after signup
}
