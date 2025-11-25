interface NavigationProps {
  children?: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  return (
    <nav className="w-full">
      {children}
    </nav>
  );
}

