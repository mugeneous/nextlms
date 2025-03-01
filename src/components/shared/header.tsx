import { Button } from "../button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>Nextlms.</div>
      <nav className="flex items-center gap-6 font-semibold">
        <div>Courses</div>
        <div>Flash Sale</div>
        <div>About</div>
        <div>Login</div>
        <div>
          <Button size="sm" className="w-fit">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};
