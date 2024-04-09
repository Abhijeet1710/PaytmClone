import { usePathname, useRouter } from "next/navigation";

import { UserIcon } from "./assets/icons";
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
    const router = useRouter();

    return <div className="py-3 flex justify-between border-b px-4 border-slate-300">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex justify-center pt-2">
    
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>

            {user &&
                <div className="ml-4 flex flex-col md:mr-4 cursor-pointer text-[#6a51a6] " onClick={() => {
                    router.push("/dashboard");
                }}>
                    <span className="text-gray-800 mx-auto"><UserIcon /></span>
                    <p className="text-xs -mt-1">{`${user.name}`}</p>
                </div>
            }

        </div>
    </div>
    
}