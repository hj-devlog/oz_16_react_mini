import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    const q = debouncedKeyword.trim();

    if (!q) return;

    navigate(`/search?query=${encodeURIComponent(q)}`, { replace: true });
  }, [debouncedKeyword, navigate]);

  return (
    <nav
      style={{
        padding: "16px 40px",
        borderBottom: "1px solid #333",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", textDecoration: "none", fontSize: "18px" }}
      >
        🎬 OZ 무비
      </Link>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="영화 제목 검색..."
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#222",
          color: "#fff",
          width: "260px",
        }}
      />
    </nav>
  );
}

export default NavBar;
