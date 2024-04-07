import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
        userId?: any
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex justify-center pt-2">
            {user && <p className="pt-2 mr-2.5 font-bold text-[#6a51a6]">{user.name}</p>}
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}