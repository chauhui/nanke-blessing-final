
export default function Contact() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>聯絡我們</h1>
      <form method="post" action="#">
        <div>
          <label>姓名: <input type="text" name="name" required /></label>
        </div>
        <div>
          <label>Email: <input type="email" name="email" required /></label>
        </div>
        <div>
          <label>訊息: <textarea name="message" rows="4" required /></label>
        </div>
        <button type="submit">送出</button>
      </form>
    </main>
  );
}
