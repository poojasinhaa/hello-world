import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';

export type HelloCardProps = {
  title?: string;
  count?: number;
  enabled?: boolean;
};

export function HelloCard(props: HelloCardProps) {
  const { title, count, enabled } = props;
  return <div style={{ padding: 8 }}>HelloCard</div>;
}

(HelloCard as any).defaultProps = {
  title: "Hello",
  count: 1,
  enabled: true,
};

addPropertyControls(HelloCard, {
  title: { type: 'string', title: 'Title' },
  count: { type: 'number', title: 'Count' },
  enabled: { type: 'boolean', title: 'Enabled' },
});
