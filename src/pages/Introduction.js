const Introduction = () => {

  return (
    <div className="p-5">
        <div>
          <p className="text-center mt-3 max-w-xl m-auto">
            May-I is a card game similar to Phase 10, where players progress through a series of rounds. Each round has specific card combinations that players must achieve. Once a round is completed, all players move on to the next round together, ensuring that no one gets stuck on a particular round.
          </p>
          <ol className="list-decimal list-inside max-w-xl m-auto mt-5">
            <li>Two sets of three cards.</li>
            <li>One set of three cards and a run of four cards.</li>
            <li>Two runs of four cards.</li>
            <li>Three sets of three cards.</li>
            <li>Two sets of three cards and one run of four cards.</li>
            <li>
              One set of three cards and a run of seven cards. No 7's or 8's for
              your set.
            </li>
            <li>
              One set of three cards and two runs of four cards. No discard in
              the end.
            </li>
          </ol>
        </div>
    </div>
  );
}

export default Introduction;
