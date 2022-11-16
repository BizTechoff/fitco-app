export const terms = {
    username: "User Name",
    signIn: "Sign In",
    confirmPassword: "Confirm Password",
    signUp: "Sign Up",
    doesNotMatchPassword: "doesn't match password",
    password: 'password',
    updateInfo: "Update Info",
    changePassword: "Change Password",
    hello: "Hello",
    invalidOperation: "Invalid Operation",
    admin: 'admin',
    yes: 'Yes',
    no: 'No',
    ok: 'Ok',
    areYouSureYouWouldLikeToDelete: "Are you sure you would like to delete",
    cancel: 'Cancel',
    home: 'Home',
    userAccounts: 'User Accounts',
    invalidSignIn: "Invalid Sign In Info",
    signOut: 'Sign Out',
    resetPassword: 'Reset Password',
    passwordDeletedSuccessful: "Password Deleted",
    passwordDeleteConfirmOf: "Are you sure you want to delete the password of",
    rememberOnThisDevice: "Remember on this device?",
    RTL: false,
    requiredField: 'שדה חובה'
}

declare module 'remult' {
    export interface UserInfo {
        isAdmin: boolean;
        isManager: boolean;
        isGuide: boolean;
        isCustomer: boolean;
    }
}
