import React from 'react';
import { Content, Heading, View } from '@adobe/react-spectrum';

import WidgetProps from '../../model/dashboard/WidgetProps';
import { MOCK_POSITION } from '../../model/vertxEventBus/Channels';

import useChannelLatest from '../hooks/useChannelLatest';
import LoadingIndicator from '../components/LoadingIndicator';

export default function SimpleWidgetlaim({ title }: WidgetProps) {
	if (typeof title !== 'string')
		throw new Error('SimpleWidget: Title is not a string');

	const data = useChannelLatest(MOCK_POSITION);

	return (
		<LoadingIndicator dependencies={[data]}>
			{() => (
				<View padding="size-100">
					<Heading level={2}>Simple Widget laim</Heading>
					<Content>This is a very simple widget here should be the seeds</Content>
					<Content>{title}</Content>
					<Content>X Coordinate: {data.x}</Content>
					<Content>Y Coordinate: {data.y}</Content>
					<Content>Z Coordinate: {data.z}</Content>
				</View>
			)}
		</LoadingIndicator>
	);
}
