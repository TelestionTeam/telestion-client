import {
	buildTestsWithInvalidObjectKeyAtomics,
	buildTestsWithObjectsMissingRequiredKeys,
	buildTestsWithValidObjectKeyValues,
	buildTestsWithValidObjects,
	TestCase,
	testPropType
} from '../tests/lib';
import {
	authPropType,
	authResultPropType,
	authResultTypePropType,
	signInResultPropType,
	signOutResultPropType
} from './auth';

describe('Tests for authentication', () => {
	describe('Tests for AuthResultType', () => {
		testPropType(
			'AuthResultType',
			authResultTypePropType,
			[
				["specific string: 'signIn'", 'signIn'],
				["specific string: 'signOut'", 'signOut']
			],
			[['generic string', 'The Box']]
		);
	});

	const fullSignIn = {
		type: 'signIn',
		reason: 'Because why not? :D',
		user: 'alice',
		eventBusUrl: 'http://localhost:9870/bridge'
	};

	const validTestsForSignInResult: Array<TestCase<typeof fullSignIn>> = [
		...buildTestsWithValidObjects(fullSignIn, ['type', 'user', 'eventBusUrl']),
		...buildTestsWithValidObjectKeyValues(fullSignIn, 'type', ['signIn']),
		...buildTestsWithValidObjectKeyValues(fullSignIn, 'reason', [
			undefined,
			null,
			'anything'
		]),
		...buildTestsWithValidObjectKeyValues(fullSignIn, 'user', ['alice']),
		...buildTestsWithValidObjectKeyValues(fullSignIn, 'eventBusUrl', [
			'http://localhost:9870/bridge'
		])
	];

	const invalidTestsForSignInResult: Array<TestCase<typeof fullSignIn>> = [
		...buildTestsWithObjectsMissingRequiredKeys(fullSignIn, [
			'type',
			'user',
			'eventBusUrl'
		]),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignIn, 'type', ['string']),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignIn, 'reason', [
			'undefined',
			'null',
			'string'
		]),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignIn, 'user', ['string']),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignIn, 'eventBusUrl', [
			'string'
		]),
		[
			"object key 'type' with generic string",
			{ ...fullSignIn, type: 'The Box' }
		]
	];

	describe('Tests for SignInResult', () => {
		testPropType(
			'SignInResult',
			signInResultPropType,
			validTestsForSignInResult,
			invalidTestsForSignInResult
		);
	});

	const fullSignOut = {
		type: 'signOut',
		reason: 'Because why not? :D'
	};

	const validTestsForSignOutResult: Array<TestCase<typeof fullSignOut>> = [
		...buildTestsWithValidObjects(fullSignOut, ['type']),
		...buildTestsWithValidObjectKeyValues(fullSignOut, 'type', ['signOut']),
		...buildTestsWithValidObjectKeyValues(fullSignOut, 'reason', [
			undefined,
			null,
			'anything'
		])
	];

	const invalidTestsForSignOutResult: Array<TestCase<typeof fullSignOut>> = [
		...buildTestsWithObjectsMissingRequiredKeys(fullSignOut, ['type']),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignOut, 'type', ['string']),
		...buildTestsWithInvalidObjectKeyAtomics(fullSignOut, 'reason', [
			'undefined',
			'null',
			'string'
		])
	];

	describe('Tests for SignOutResult', () => {
		testPropType(
			'SignOutResult',
			signOutResultPropType,
			validTestsForSignOutResult,
			invalidTestsForSignOutResult
		);
	});

	describe('Tests for AuthResult (aka SignInResult and SignOutResult)', () => {
		testPropType(
			'AuthResult',
			authResultPropType,
			[...validTestsForSignInResult, ...validTestsForSignOutResult],
			[...invalidTestsForSignInResult, ...invalidTestsForSignOutResult]
		);
	});

	const fullAuth = {
		signIn: () => {},
		signOut: () => {},
		onAuthStateChanged: () => {}
	};

	const validTestsForAuth: Array<TestCase<typeof fullAuth>> = [
		...buildTestsWithValidObjects(fullAuth, [
			'signIn',
			'signOut',
			'onAuthStateChanged'
		]),
		...buildTestsWithValidObjectKeyValues(fullAuth, 'signIn', [() => {}]),
		...buildTestsWithValidObjectKeyValues(fullAuth, 'signOut', [() => {}]),
		...buildTestsWithValidObjectKeyValues(fullAuth, 'onAuthStateChanged', [
			() => {}
		])
	];

	const invalidTestsForAuth: Array<TestCase<typeof fullAuth>> = [
		...buildTestsWithObjectsMissingRequiredKeys(fullAuth, [
			'signIn',
			'signOut',
			'onAuthStateChanged'
		]),
		...buildTestsWithInvalidObjectKeyAtomics(fullAuth, 'signIn', ['function']),
		...buildTestsWithInvalidObjectKeyAtomics(fullAuth, 'signOut', ['function']),
		...buildTestsWithInvalidObjectKeyAtomics(fullAuth, 'onAuthStateChanged', [
			'function'
		])
	];

	describe('Tests for Auth', () => {
		testPropType('Auth', authPropType, validTestsForAuth, invalidTestsForAuth);
	});
});
