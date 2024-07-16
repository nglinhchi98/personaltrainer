import { useEffect, useState } from "react";

export default function Quotes() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].text);
        setAuthor(data[randomIndex].author);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <i>"{quote}"</i><br></br>
      <strong>{author}</strong>
    </div>
  );
}
