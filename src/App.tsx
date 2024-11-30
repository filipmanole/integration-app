import { Button } from "./components/ui/button";
import { useTheme } from "./ThemeContext";

export const App = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
};

export default App;
