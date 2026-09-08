import type { Route } from './+types/not-found';
import { useNavigate } from 'react-router';
import fg from 'fast-glob';

export async function loader({ params }: Route.LoaderArgs) {
  const matches = await fg('src/**/page.{js,jsx,ts,tsx}');
  return {
    path: `/${params['*']}`,
    pages: matches
      .sort((a, b) => a.length - b.length)
      .map((match) => {
        const url = match.replace('src/app', '').replace(/\/page\.(js|jsx|ts|tsx)$/, '') || '/';
        const path = url.replaceAll('[', '').replaceAll(']', '');
        const displayPath = path === '/' ? 'Homepage' : path;
        return { url, path: displayPath };
      }),
  };
}

export default function NotFoundPage({
  loaderData,
}: {
  loaderData: Awaited<ReturnType<typeof loader>>;
}) {
  const navigate = useNavigate();
  const missingPath = loaderData.path.replace(/^\//, '');

  return (
    <div className="flex sm:w-full w-screen sm:min-w-[850px] flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-medium text-gray-900 mb-4">404 — Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        The page "/{missingPath}" doesn't exist.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Go Home
      </button>

      {loaderData.pages.length > 0 && (
        <div className="mt-12 w-full max-w-xl">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide">Available Pages</p>
          <div className="flex flex-col gap-2">
            {loaderData.pages.map((page) => (
              <button
                type="button"
                key={page.url}
                onClick={() => navigate(page.url)}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-medium text-gray-900">{page.path}</span>
                <span className="text-sm text-gray-400">{page.url}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
