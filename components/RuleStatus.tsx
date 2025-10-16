
import React, { memo } from "react";
import Svg, { Path, G } from "react-native-svg";

export type RuleStatusProps = {
  ok: boolean;
  size?: number;
  testID?: string;
};

function RuleStatusBase({ ok, size = 18, testID }: RuleStatusProps) {
  if (ok) {
    return (
      <Svg
        width={size}
        height={(size * 19) / 18}
        viewBox="0 0 18 19"
        fill="none"
        accessibilityRole="image"
        accessibilityLabel="rule-ok"
        testID={testID ?? "rule-status-ok"}
      >
        <Path
          d="M9 17.2969C13.125 17.2969 16.5 13.9219 16.5 9.79688C16.5 5.67188 13.125 2.29688 9 2.29688C4.875 2.29688 1.5 5.67188 1.5 9.79688C1.5 13.9219 4.875 17.2969 9 17.2969Z"
          stroke="#B0F200"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          opacity={0.34}
          d="M5.8125 9.79437L7.935 11.9169L12.1875 7.67188"
          stroke="#B0F200"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel="rule-error"
      testID={testID ?? "rule-status-error"}
    >
      <Path
        d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
        stroke="#DE2424"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G opacity={0.4}>
        <Path
          d="M6.875 11.12L11.12 6.875"
          stroke="#DE2424"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.12 11.12L6.875 6.875"
          stroke="#DE2424"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export const RuleStatus = memo(RuleStatusBase);
