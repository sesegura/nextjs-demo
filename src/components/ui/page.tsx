import { Separator } from "./separator";

export function Page({ children }: React.PropsWithChildren) {
  return <div className="h-full flex flex-col mx-2">{children}</div>;
}

export function PageHeader({ children }: React.PropsWithChildren) {
  return (
    <div>
      <h1 className="text-3xl font-semibold p-2">{children}</h1>
      <Separator />
    </div>
  );
}

export function PageContent({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
