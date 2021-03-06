import { ReactNode } from 'react';
import { Flex, Heading, ProgressCircle } from '@adobe/react-spectrum';
import { useDependencyTimeout } from '../../hooks';

/**
 * React Props of {@link LoadingIndicator}
 *
 * For more information about React Props, please look here:
 * {@link https://reactjs.org/docs/components-and-props.html}
 *
 * @see {@link LoadingIndicator}
 * @see {@link https://reactjs.org/docs/components-and-props.html}
 */
export interface LoadingIndicatorProps {
	/**
	 * a function to children to display
	 * if all dependencies are defined
	 */
	children: () => ReactNode;

	/**
	 * the dependencies to check if they are undefined
	 */
	dependencies: Array<any>;

	/**
	 * the timeout in milliseconds until the function throws,
	 * if it is 0 it waits indefinitely
	 */
	timeout?: number;
}

/**
 * Renders a loading indicator if some of the dependencies are not defined.
 *
 * @throws Error - if some dependencies are undefined until timeout
 * and timeout is set
 *
 * @example
 * ```ts
 * // Render a loading indicator if position is undefined otherwise the position
 * const [position, setPosition] = useState<Position>();
 * return (
 * 	 <LoadingIndicator dependencies={[position]}>
 * 	   {() => (
 * 	     <p>{position}</p>
 * 	   )}
 * 	 </LoadingIndicator>
 * );
 * ```
 */
export function LoadingIndicator({
	children,
	dependencies,
	timeout
}: LoadingIndicatorProps) {
	const someAreUndefined = useDependencyTimeout(timeout || 0, dependencies);

	if (someAreUndefined) {
		return (
			<Flex
				width="100%"
				height="100%"
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<ProgressCircle aria-label="Loading…" isIndeterminate />
				<Heading level={2}>Loading…</Heading>
			</Flex>
		);
	}

	return <>{children()}</>;
}
