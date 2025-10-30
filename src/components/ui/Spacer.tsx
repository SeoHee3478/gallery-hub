type SpacerProps = {
  height?: number | string;
  width?: number | string;
};

export default function Spacer({ height, width }: SpacerProps) {
  return (
    <div
      style={{
        height: height ?? 0,
        width: width ?? 0,
      }}
    ></div>
  );
}
