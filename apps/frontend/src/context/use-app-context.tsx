import { PageContext } from '#/pages/app/renderer/types';
import { toBerlinDate } from '#/util';
import { format, startOfDay } from 'date-fns';
import {
  createSignal,
  createContext,
  useContext,
  JSX,
  Accessor,
  createEffect,
} from 'solid-js';

type View = 'Week' | 'Day';

const AppContext = createContext<Accessor<{ date: Date; view: View }>>();

export function AppContextProvider(props: {
  pageContext: PageContext;
  children: JSX.Element;
}) {
  const [appState, setAppState] = createSignal({
    date: parseUrlDate(props.pageContext),
    view: getView(),
  });

  createEffect(() => {
    if (props.pageContext.exports.title === 'Kalendar')
      setAppState((prev) => ({
        ...prev,
        date: parseUrlDate(props.pageContext),
      }));
  });

  return (
    <AppContext.Provider value={appState}>{props.children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)!;
}

function getView(): View {
  if (window.innerWidth < 700) return 'Day';
  return 'Week';
}

function parseUrlDate(pageContext: PageContext) {
  let startOfWeekDateVar;
  try {
    const startOfWeekDateQueryParam = pageContext.urlParsed.search['datum'];

    const [day, month, year] = startOfWeekDateQueryParam.split('-');

    startOfWeekDateVar = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    if (!startOfWeekDateVar.getTime()) throw Error('invalid-date');
  } catch (e) {
    startOfWeekDateVar = new Date();
  }

  const weekStart = startOfDay(toBerlinDate(startOfWeekDateVar));

  if (pageContext.exports.title === 'Kalendar')
    window.history.replaceState(
      {},
      '',
      `/app/kalendar?datum=${format(weekStart, 'dd-MM-y')}`,
    );
  return weekStart;
}
