module.exports = {
  {% if tsSupport %}
  preset: 'ts-jest',
  {% endif %}
  testEnvironment: 'node',
  testTimeout: 1000000000,
  maxWorkers: 1
}
