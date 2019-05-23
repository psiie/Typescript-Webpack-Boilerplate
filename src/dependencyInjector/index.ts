import DependencyInjector from './injector';
import dependencyList from './dependencies';

const injector = new DependencyInjector(dependencyList);

export default injector;

export const inject = injector.inject;

export const injectAll = injector.injectAll;
