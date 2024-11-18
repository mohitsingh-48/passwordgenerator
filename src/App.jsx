import React, { useState, useCallback,useEffect ,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [no, setno] = useState(false);
  const [ch, setch] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (no) str += "1234567890";
    if (ch) str += "~{}|_+=-<>?:*&";

    for (let i = 0; i < length; i++) { 
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex); 
    }
    setPassword(pass);
  }, [length, no, ch]);
   const copyPasswordToclipboard=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
   },[password])
useEffect(()=>{
  passwordGenerator()
},[length,no,ch])
  return (
    <>
      <div className="w-full max-w-md mx-auto text-center shadow-md rounded-lg px-4 py-3 my-8 text-black-900 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button
          onClick={copyPasswordToclipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))} // Convert value to number
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={no} // Bind to `no` state
              id="numberInput"
              onChange={() => setno((prev) => !prev)} // Toggle `no` state
            />
            <label htmlFor="numberInput"> Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={ch} // Bind to `ch` state
              id="specialInput"
              onChange={() => setch((prev) => !prev)} // Toggle `ch` state
            />
            <label htmlFor="specialInput"> Characters</label>
          </div>
        </div>
        <button
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
