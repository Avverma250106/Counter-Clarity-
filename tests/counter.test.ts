import { Clarinet, Tx, Chain, Account } from '@clarigen/test';
import { assertEquals } from 'vitest';

// The contract name
const CONTRACT_NAME = 'counter';

Clarinet.test({
  name: "Counter contract test",
  async fn(chain: Chain, accounts: Map<string, Account>) {

    const deployer = accounts.get('deployer')!;

    // 1. Initial count should be 0
    let call = chain.callReadOnlyFn(CONTRACT_NAME, 'get-count', [], deployer.address);
    assertEquals(call.result, '(ok 0)');

    // 2. Increment the counter
    let tx1 = chain.mineBlock([Tx.contractCall(CONTRACT_NAME, 'increment', [], deployer.address)]);
    assertEquals(tx1.receipts[0].result, '(ok 1)');

    // 3. Increment again
    let tx2 = chain.mineBlock([Tx.contractCall(CONTRACT_NAME, 'increment', [], deployer.address)]);
    assertEquals(tx2.receipts[0].result, '(ok 2)');

    // 4. Decrement the counter
    let tx3 = chain.mineBlock([Tx.contractCall(CONTRACT_NAME, 'decrement', [], deployer.address)]);
    assertEquals(tx3.receipts[0].result, '(ok 1)');

    // 5. Final count should be 1
    let finalCount = chain.callReadOnlyFn(CONTRACT_NAME, 'get-count', [], deployer.address);
    assertEquals(finalCount.result, '(ok 1)');
  },
});
