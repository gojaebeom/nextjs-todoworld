import { useTheme } from "src/hooks";

export default function LoadingContainer({ isLoading = false, children }) {
  const { theme } = useTheme();

  let color;
  switch (theme.type) {
    case "BLUE":
      color = "#2563EB";
      break;
    case "GREEN":
      color = "#328968";
      break;
    case "PINK":
      color = "#F87171";
      break;
    case "PURPLE":
      color = "#A569BD";
      break;
    case "ORANGE":
      color = "#F59E0B";
      break;
    default:
      color = "#2563EB";
  }

  return isLoading ? (
    <div
      className="fixed w-full h-full"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  ) : (
    children
  );
}
