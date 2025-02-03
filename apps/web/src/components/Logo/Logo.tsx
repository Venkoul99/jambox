export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo.PNG"
        alt="Logo"
        style={{
          width: '400px',
          height: '100px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
