import React, { useState, useEffect, useContext, createContext } from 'react'
import Router from 'next/router'

import firebase from '@/lib/firebase'
import { getFirestoreUser, saveUser } from '@/utils/db'

// Create authContext
const authContext = createContext()

// Return the Auth provider with all the reuseable firebase auth function
export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// This will be imported in files that need auth stuff
// Create useAuth hook that return the authContext
export const useAuth = () => {
  return useContext(authContext)
}

// React hook to give reuseable firebase auth function
function useAuthProvider() {
  const [user, setUser] = useState(null)

  // Set user in state if logged in
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)

      const { token, refreshToken, ...userForFirestore } = user

      // Save user info to db
      saveUser(userForFirestore)

      const { mobile, university } = await getFirestoreUser(user.uid)
      setUser({ ...user, mobile, university })
      return user
    } else {
      setUser(false)
      return false
    }
  }

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user))
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        Router.push('/')
        handleUser(false)
      })
  }

  // Watch the firebase auth state and update it accordingly
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user))

    return () => unsubscribe()
  }, [])

  return {
    user,
    setUser,
    signInWithGoogle,
    signOut,
  }
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.za,
    refreshToken: user.refreshToken,
  }
}
