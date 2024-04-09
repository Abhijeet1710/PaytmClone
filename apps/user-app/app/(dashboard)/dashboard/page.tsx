import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../../lib/actions/utils";

const session = await getServerSession(authOptions);

function getGreeting(name: str) {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    return `${greeting}, ${name}`;
}

function convertAmountToWords(amount) {
    var singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    var teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convertLessThanOneThousand(num) {
        var result = "";
        if (num >= 100) {
            result += singleDigits[Math.floor(num / 100)] + " Hundred ";
            num %= 100;
        }
        if (num >= 10 && num <= 19) {
            result += teens[num - 10];
            return result;
        } else if (num >= 20) {
            result += tens[Math.floor(num / 10)];
            num %= 10;
        }
        if (num > 0) {
            result += singleDigits[num];
        }
        return result;
    }

    if (amount == 0) {
        return "Zero";
    }

    var result = "";
    var billion = Math.floor(amount / 1000000000);
    var million = Math.floor((amount % 1000000000) / 1000000);
    var thousand = Math.floor((amount % 1000000) / 1000);
    var remaining = amount % 1000;

    if (billion > 0) {
        result += convertLessThanOneThousand(billion) + " Billion ";
    }
    if (million > 0) {
        result += convertLessThanOneThousand(million) + " Million ";
    }
    if (thousand > 0) {
        result += convertLessThanOneThousand(thousand) + " Thousand ";
    }
    if (remaining > 0) {
        result += convertLessThanOneThousand(remaining);
    }

    return `${result.trim()} Rs. Only` ;
}


export default async function() {
    const {name, email, id} = session.user
    const balance = await getBalance(id)

    const amount = balance.amount
    console.log("Bala"+JSON.stringify(balance));
    

    return <div className="w-screen">
    <div className="pl-4 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        {getGreeting(name)}
    </div>
    <div className="mt-4 md:mt-8 mx-4 md:mx-10 w-vx whiteCard px-4 py-2 md:px-8 md:py-8 rounded-lg">
        <div className="border-b mb-4">
            <p className="text-sm mb-2 md:mb-4 pC">User Profile Details</p>
        </div>
        <div>
            <p><span> Name : </span> <span className="text-xl pC">{name}</span> </p>

            <p><span> UserId : </span> <span className="text-xl pC">00{id}</span> </p>

            <p><span> Phone No. : </span> <span className="text-xl pC">+91 {email}</span> </p>
        </div>
        <div className="mt-4 md:mt-8">
            <p className="text-sm">Portfolio value.</p>
            <p className="text-3xl pC"> INR. {amount.toLocaleString()} </p>
            <p className="text-sm pC"> {convertAmountToWords(amount)} </p>
        </div>
    </div>
</div>
}