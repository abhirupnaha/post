import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useQueryHook(url: string) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    (async function () {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        setError(false);

        const response = await axios.get(url, {
          signal: abortControllerRef.current.signal,
        });
        setData(response.data);
      } catch (err: unknown) {
        setError(true);

        if (axios.isCancel(err)) {
          console.log("request cancelled");
          return;
        }

        console.log("error occured while requesting");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  return [data, isLoading, error];
}
