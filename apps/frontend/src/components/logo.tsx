export function Logo(props: { class: string }) {
  return (
    <a rel='external' href='/app'>
      <img src={'/logo.png'} class={props.class} alt='logo' />
    </a>
  );
}
