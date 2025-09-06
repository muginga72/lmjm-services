export default function useAuth() {

  return {
    user: null,
    signIn: async (email, password) => { /* ... */ },
    signOut: async () => { /* ... */ }
  };
}
