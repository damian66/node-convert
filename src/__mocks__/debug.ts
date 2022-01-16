import { DebugFactoryMock, DebugMock } from '../types';

const debugMock = <DebugMock>jest.fn();
const debugFactoryMock = <DebugFactoryMock>jest.fn().mockReturnValue(debugMock);
debugFactoryMock.enable = jest.fn();
debugFactoryMock.debugMock = debugMock;

export default debugFactoryMock;
