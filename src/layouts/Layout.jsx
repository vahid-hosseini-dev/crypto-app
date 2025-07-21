import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
          <a href="https://vahidhosseini.net">VHD</a> | React.JS{" "}
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Vahid Hosseini with ❤</p>
      </footer>
    </>
  );
}

export default Layout;
