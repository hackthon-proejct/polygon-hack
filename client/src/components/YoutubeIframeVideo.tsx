import { useBreakpointValue } from "@chakra-ui/react";
import { useWindowResize } from "@utils/hooks";
import { useState } from "react";

type Props = { embedURL: string };
export default function YoutubeIframVideo({ embedURL }: Props) {
  const [iframeSizeMultiplier, setIframeSizeMultipler] = useState(1);
  const breakpointSize = useBreakpointValue({
    base: 0.25,
    sm: 0.5,
    md: 0.75,
    xl: 1,
  });

  // bug with breakpointSize and SSR
  useWindowResize(() => {
    setIframeSizeMultipler(breakpointSize || 0);
  }, [breakpointSize]);
  return (
    <iframe
      width={840 * iframeSizeMultiplier}
      height={475 * iframeSizeMultiplier}
      src={embedURL}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
