import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Navigation({ onCreate, onShowMine }) {
  return (
    <header className="mb-8 flex flex-col gap-5 rounded-[32px] bg-background/90 p-6 mr-5 ml-5 shadow-sm sm:flex-row sm:items-center sm:justify-between ">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary-foreground">
          Task dashboard
        </p>
        <div>
          
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse task cards, create new tasks, and filter by tasks assigned to you or created by you.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to={"/register"}>
        <Button >
          Register
        </Button>
        </Link>
        
        <Link to={"/login"}>
        <Button >
          Login
        </Button>
        </Link>

        <Link to={"/tasksbyme"}>
        <Button> 
            Created by Me
        </Button>
        
        </Link>
      </div>
    </header>
  );
}
