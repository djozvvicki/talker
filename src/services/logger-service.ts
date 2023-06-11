const useLoggerService = () => {
  // Logger
  let inGroup = false;
  const methodToColorMap = {
    debug: `#7f8c8d`,
    log: `#2ecc71`,
    warn: `#f39c12`,
    error: `#c0392b`,
    groupCollapsed: `#3498db`,
    groupEnd: null, // No colored prefix on groupEnd
  };

  type ConsoleMethod =
    | "log"
    | "groupCollapsed"
    | "warn"
    | "error"
    | "debug"
    | "groupEnd";

  const print = function (method: ConsoleMethod, args: any) {
    if (method === "groupCollapsed") {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console[method](...args);
        return;
      }
    }
    const styles = [
      `background: ${methodToColorMap[method]}`,
      `border-radius: 0.5em`,
      `color: white`,
      `font-weight: bold`,
      `padding: 2px 0.5em`,
    ];
    // When in a group, the workbox prefix is not displayed.
    const logPrefix = inGroup ? [] : ["%cTalker", styles.join(";")];
    console[method](...logPrefix, ...args);
    if (method === "groupCollapsed") {
      inGroup = true;
    }
    if (method === "groupEnd") {
      inGroup = false;
    }
  };

  return { print };
};

export default useLoggerService;
