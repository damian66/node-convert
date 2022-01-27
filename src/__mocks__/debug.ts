import { DebugFactoryMock, DebugMock } from '../types.d';

const debugMock = <DebugMock>jest.fn();
const debugFactoryMock = <DebugFactoryMock>jest.fn().mockReturnValue(debugMock);
debugFactoryMock.enable = jest.fn();
debugFactoryMock.debugMock = debugMock;

export default debugFactoryMock;
