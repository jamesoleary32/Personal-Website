---
title: "An introduction to ZKs"
date: "15/02/2024"
category: "Computer-Science"
readingTime: 12
---

# An Introduction to Zero Knowledge  
My article is laid out in a few  sections 
- Introduction to ZK
- Interactive Zero Knowledge Proofs 
- Non-Interactive Zero Knowledge Proofs 
- What are ZK-Proofs 
- ZK-Proof Construction

## Introduction 
The essence of zero knowledge is for someone, (we call them a prover) to be able to prove possession of knowledge, or properties of the knowledge, to someone else (we call them a verifier) without revealing the knowledge itself. 

There are two types of zero knowledge proofs: interactive proofs and non-interactive proofs. In the context of blockchain we are typically most interested in non-interactive proofs, the most discussed type being **SNARKs**, which I'll come onto later.

## Interactive Zero Knowledge Proofs 
**What is meant by interaction?** By interaction we mean that rather than passively reading a proof the verifier engages in a non-trivial interaction with the prover. 
An interesting aspect of interactive proofs is the probabilistic component, this will become clear in an example. 
#### Example of a Zero-Knowledge Interactive Proof: Proving colours to a blind verifier 
#### The Setup 
- **The objective of the Prover**: 
- There is a sheet of paper which may be of a single colour, or have a different colour on either side.
- The prover can tell the difference between these two colours
- The verifier is colour-blind and cannot perceive a difference between the two colours, they know that they are colour blind and could be convinced that the paper has two colours on it.
- At any given point there is a single side of the paper facing up. 
- The verifier wants to find out if there are 2 colours on the page  
- The verifier asks the prover to prove that there are 2 colours on the page | if the prover can perceive changes in the state of the page then it proves there are different states

#### Interactive Proof Algorithm:
1) The verifier asks the prover what the current colour of the paper is
2) The prover responds with the perceived colour
3) The verifier flips a coin as to decide whether to flip the piece of paper 
4) Based on the coin toss, the verifier asks the prover what the new colour is
5) The prover responds, if the paper was flipped and the prover doesn't change their answer then there is only a single colour, if the prover is right there is a 50% chance now that the prover is telling the truth and that hence there are two colours 
6) steps 1-5 are repeated until the verifier is convinced 

#### Why is this zero-knowledge?
- The prover possesses knowlege that the verifier lacks due to their colour blindness. 
- The prover demonstrates the existence of two colours without revealing the specific colours themselves.
- The verifier gains confidence in the existence of 2 colours without learning any information about what those colours actually are.

#### Example of a Non-Zero-Knowledge Interactive Proof: The Graph Non-Isomorphism Problem

#### The Setup
- **The objective of the Prover**: Given two graphs *G1* & *G2*, the prover wants to prove to the verifier that *G1* & *G2* are not **[isormorphic](/Personal-Website/notes/Isomorphism%20between%20Graphs.md)**. 

#### Interactive Proof Algorithm:
1) The prover generates a random **[permutation](/Personal-Website/notes/Permutation.md)** of the vertices of G1 
2) The prover sebds this random permutation to the verifier 
3) The verifier randomly chooses a vertex from G1 and requests its image under pi
4) the prover sends pi(v) to the verifier 
5) the verifier checks if the images of the neightbours of v under pi match the neighbours of pi(v) in G2
6) steps 1-5 are repeated until the verifier is convinced 

#### Why is this not zero-knowledge?
- In the process of demonstrating non-isomorphism, specific information about the structure of the graphs is revealed to the verifier. 
- Recap: ZK Proofs are designed to convince a verifier of a statement's truthfulness without disclosing any informaiton beyond the validity of a statement. 

## Non-Interactive Proofs 
**What is meant by Non-interaction?** By non-interaction we mean that a prover can provide a proof that can be verified by the verifier without any further interaction or communication between the two parties. The proof is self-contained and can be verified independently by the verifier. Non-interactive proofs are desirable when there are constraints on communication bandwidth. 

### Example: Schnorr Protocol, A non-interactive proof of knowledge for a discrete logarithm
**Context:** 
- A non-interactive proof of knowledge for a discrete logarithm
- We have a cyclic group G of prime order q with a generator g and h is some element in G that we want tor prove knowledge of its discrete logarithm. I.e. to prove we know the x for which h = g^x
- **The prover**: chooses a random r from (the set of integers modulo q)
- Computes R = g^r
- Computes a **[challenge](/Personal-Website/notes/Cryptographic%20Challenge.md)** e based on R and h 
- Computes s=r+ex mod q
- **The verifier**: recievers R and s
- computes the chalennge e based on R and h 
- Verifies that R = g^s g^-e

## What are ZK-Proofs?
- a ZKP system is a way for a prover to convince a verifier that some statement/predicate is true without revealing information why its true 

### NARK: Non-Interactive Argument of Knowledge
- A cryptographic protcol that allows a **prover** to convince a **verifier** that they possess certan knolwedge or information without any further interaction beyond an initial exchange. 
- NARKs rely on certain mathematical properties that allow for the creation of proofs that reveal minimal information about the prover's knowledge beyond the validity of the statement being proved 

### SNARK: Succint Non-Interactive Argument of Knowledge
- SNARKs are differentiated from NARKs according to this idea of *succint*ness.
- Recapping, a NARK is a cryptographic protocol where provers generate proofs and verifiers verify proofs. A key characteristic is thus how efficiently are these proofs generated and how quickly are they verified. 
- A SNARK is thus a NARK for which the time taken to generate a proof is short, and the time taken to verify the proof is short. 

## ZK-Proof Construction (zk-SNARK)
### The zk-Proof Workflow 
1) Define a statement  
2) Write our circuit 
3) Compile the Circuit 
4) Create a witness 
5) Trusted Setup  
6) Generate the proof
7) Verify the proof

*There is some flexibility vis-a-vis the order of the steps*

### Step 1: Defining a Problem Statement
* that you want to prove knowledge of without revealing specific details
* Lets use the example: "I know two numbers `a` and `b`, such that `a + b = c` where `c` is publicly known. 

### Steps 2 & 3: Writing and Compiling the Circuit 
We want to represent our problem statement as a computational circuit with three inputs `a` (private input), `b` (private input), `c` (public input) 

#### Abstraction Level 1: Arithmetic Circuits 
* Arithmetic circuits (AC) are a way of representing complex computations in terms of simple components. The complexity is broken down into simple components of addition, subtraction, 
* multiplication and division operations. The AC repsents the problem or computation you want to prove you've solved correctly 
* **For our example**, we have two inputs a & b, and our gate is an addition operator, shown below
* 
        +       (Output)
       / \
      a   b

 *However a useful AC may have 20,000 gates, this wouldn't be very intuitive, we need a level of abstraction on top of the AC which we can deal with.*


#### Abstraction Level 2: Rank 1 Constraint Systems (R1CS)
R1CS is a type of predicate representation used in ZKPs, its a format for representing ZKP Arithmetic Circuits
* Public input, x is represented as a set of field elements x1, ..., xl
* Private input, w, is represented as a set of fielement elements w1, ..., w_m-l-1
* Predicate, p: n equations of form `alpha x beta = gamma`, where `alpha`, `beta` and `gamma` are affine combinations of variables.  
* This is an abstraction on top of an Arithmetic Circuit
* The underlying arithmetic circuit may be very complex, as it is a network of interconnected gates performing arithmetic operations such as addition & subtraction. 
* R1CS simplifies this representation by focusing on the constraints that the inputs and outputs of the computation must satisfy rather than the specific details of the circuit topology 
* Computations are expressed as a set of constraints that the inputs and ouputs of the computation must satsify. These constraints are typically represented as linear equations over finite fields. 
* Each constraint is a linear equation that involves a combination of input/intermediate/output variables. 
* Allows us to represent computations in a concise and structure, however we would rather than deal with the logic - we need another level of abstraction!  
* **For our example**
* `a + b = c` is expressed as a set of linear constraints on the input variables `a`, `b`, and `c`. We'll represent this as four constraints:
1) Constraint 1: `a + b - c = 0`
2) Constraint 2: `(1)(a) + (0)(b) + (0)(c) = a`
3) Constraint 3: `(0)(a) + (1)(b) + (0)(c) = b`
4) Constraint 4: `(-1)(a) - (1)(b) + (1)(c) = 0`
In R1CS, identity constraints are used to ensure that the input vairbale remain unchanged throughout the computation represented by the constraint. In the c

#### Abstraction Level 3 Hardware Description Languages, Circom
* We probably don't want to write the R1CS directly, we want to deal with the logic of the computation 
* Lets say we want to write a circuit that verifies the sum of two numbers, the example Circom code would be: 
* We can use a language like Circom for circuit representation.
```text
template Adder() {
    signal input a; // First private input
    signal input b; // Second private input
    signal input c; // Public input (expected sum)
    
    signal output out; // Output signal to indicate if the sum is correct

    // Define the computation
    signal sum;
    sum <== a + b;

    // Check if the computed sum matches the public input
    out <== sum === c;
}

component main = Adder();
```
* The Circom program is translated into a Rank-1 Constraint System 
* The circuit has two private inputs: `a` and `b`
* `C` is the public input 
* The circuit computes *sum = a + b*, using the syntax `sum <== a + b;`
* The circuit outputs 1 if the sum of a & b is equal to the expected sum `signal output out;`



### Putting it all together: How our Circom compiles -> R1CS -> AC
* The Circom compiler translates the high-level, human-readable, Circom program into a format suitable for use with ZKPs. The result of compiling a Circom circuit is a set of constraints and parameters that define the circuits behaviour and structure in a format compatible with zk-Proof libraries, such as R1CS.   
* The R1CS serves as an intermediate step between our high-level description of the computation and the Arithmetic circuit. It provides a way to express computation in terms of mathematical constraints *I really struggle to understand this idea*
* The Arithmetic Circuit is what is actually used to generate and verify Zero-Knowledge Proofs 
* The AC represents the computation/algorithm you want to prove knowledge of 
* A way to ground the the process of creating the ZK circuit, is at the micro-level to show how circom translates into Rank-1 Constraint Systems which thus resolves into an Arithmetic circuit. 
* **Translating our Circom into R1CS** 
    * **Addition Constraint**: the operation `sum <== a + b;` translates to a constraint that ensures the sum of `a` and `b` = `sum`, in R1CS this can be represented as (a)*(1) + (b)*(1)-(sum)*(1)=0
    * **Equality Constraint**: The check `out <== sum === c;` is a little more complex, **R1CS fundamentally represents equations - not boolean checks**. 


## Step 4: Generating a Witness
* we have a witness that contains the values `a` and `b` that satisfy the equation `a + b = c`
* A witness is a set of inputs/data that satisfies the conditions specified by the computation being proven. A witness is a set of inputs that when fed into a circuit results in an output that satisfies certain conditions. The witness is associated with the specific instance of the computation/statement being proven 
* 
Witness (w):
  - w_a: Value of private input a
  - w_b: Value of private input b

## Step 5: Trusted Setup Phase
* Cryptographic Parameter Generation
* The Key Generator Algorithm performs the trusted setup by taking a secret source of randomness and our compiled Circuit as inputs and generating two publicly available keys: a proving key (pk) and a verification key (vk).
* They are called the public parameters as they are shared openly and can be used by any party to generate or verify proofs for the specific circuit. 
* The proving key is used by the prover to construct ZK-Proofs that demonstrate that they have correctly performed a computation (as per the Arithmetic Circuit) without revealing the computation's inputs or outputs. It contains information necessart for the prover to construct valid proofs by demonstrating knowledge of a witness satisfying the program 
* The verification key is used by the verifier algorithm to verify proofs generated by the prover. 

## Steps 6: Proof Construction
* We now have all our inputs for our proof:
    * The Proving Key (pk)
    * The Witness/private input (w)
    * The Public input (x) 
* We now need to choose a specifc type of ZK Proof system.
* This ZK Proof system needs to encode our witness and public input into a suitable format for cryptographic operations, perform some cryptographic operations and generate a coherent proof object.

### Proof Verification
* Verifying Proofs
* Efficiency 

