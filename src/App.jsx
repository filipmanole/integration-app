import "./App.css";
import { useTheme } from "./ThemeContext";

export const App = () => {
  const { toggleTheme } = useTheme();

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <button onClick={toggleTheme}>Toggle Theme</button>
    </h1>
  );
};

export default App;
