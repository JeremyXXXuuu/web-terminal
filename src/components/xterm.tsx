import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";

const XtermTerminal = () => {
  const terminalRef = useRef(null);

  const [cmd, setCmd] = React.useState<string>("");
  useEffect(() => {
    const terminal = new Terminal({
      // 渲染类型
      // rendererType: 'canvas',
      //   是否禁用输入
      disableStdin: false,
      cursorStyle: "underline",
      //   启用时光标将设置为下一行的开头
      convertEol: true,
      // 终端中的回滚量
      scrollback: 10,
      fontSize: 14,
      rows: 20,
      // 光标闪烁
      cursorBlink: true,
      theme: {
        //   字体
        foreground: "#ffffff",
        background: "#000000",
        // 光标
        cursor: "help",
      },
    });

    const fitAddon = new FitAddon();

    // Attach the terminal instance to the DOM element
    terminal.open(terminalRef.current!);
    fitAddon.fit();
    terminal.loadAddon(fitAddon);
    terminal.focus();
    terminal.write("Hello world! ");

    terminal.write("\n");

    terminal.writeln("Hello world! ");

    // You can customize the terminal appearance and behavior here
    // For example, you can set terminal options:
    // terminal.setOption('theme', { ... });
    // terminal.setOption('cursorBlink', true);

    // Handle user input or output as needed
    // terminal.onData((data) => {
    //   terminal.write(data);
    //   // Handle user input data here (e.g., send it to your command handler)
    //   console.log('User input:', data);
    // });

    const prompt = () => {
      const shellprompt = "$ ";
      terminal.write("\r\n" + shellprompt);
    };

    let cmdBuffer = "";
    terminal.onKey((key) => {
      const char = key.domEvent.key;
      cmdBuffer += char;
      setCmd(cmdBuffer);
      console.log("User char:", char);
      if (char === "Enter") {
        console.log("User cmd:", cmdBuffer);
        setCmd("");
        cmdBuffer = "";
        prompt();
      } else if (char === "Backspace") {
        terminal.write("\b \b");
      } else {
        terminal.write(char);
      }
    });

    // Clean up the terminal when the component unmounts
    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef}></div>;
};

export default XtermTerminal;
