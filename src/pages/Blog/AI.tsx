import "../HomePage.css";
import "./Blog.css";

export default function AIPage() {
  return (
    <div>
      <h1 className="header">Trying to understand AI</h1>
      <div className="contents">
        <p>
          When I first encountered AI chatbots, it was genuinely very
          impressive. Being able to engage in a conversation with a chef,
          fitness coach, language expert... all at once felt unbelievable. This
          was also the time I started to hear about the general negative
          rhetoric about AI and it left an unpleasant feeling. However, to
          completely disregard the scientific progress right before our eyes,
          felt wasteful in and of itself. I wanted to understand the mechanics
          behind this progress both in a theoretic and practical way. Lets
          begin!
        </p>
        <h2>Developing a Neural Network</h2>
        <p>image of NN + https://bbycroft.net/llm</p>
        <p>
          A core concept with AI is the use of Neural Networks. Built to mimic
          the complex mechanisms within our brains that allow us to be
          essentially, a species of predictors. Our brains are continuously
          trained on our sensory input so that our prediction stats are maxxed
          out. It's why we have that sixth sense feeling, why we aren't good at
          handling big changes, and why it feels strange to get onto a
          stationary escalator. Neural networks have derived its fundamentals to
          be that of a master predicator, which comes with all its pros and also
          cons.
        </p>
        <p>
          I will explain how we can code a neural network (NN) to recognise
          images and the number it shows. Specifically, the MNIST database
          <a href="#fn-1" id="ref-1" className="footnote">
            <sup>1</sup>
          </a>{" "}
          will be used to train the NN to determine the number in the given
          image. This is seen as the simplest example for neural networks, a
          "Hello World!" if you will. It will be written in Python and use the
          numpy library
          <a href="#fn-2" id="ref-2" className="footnote">
            <sup>2</sup>
          </a>
          {". "}
        </p>
        <h3>Inputs and Outputs</h3>
        <p>image of handwritig broken down into pixels</p>
        <p>
          You always want to start off by determining your inputs and outputs.
          Our computer can only 'see' (read) the pixels of the image and their
          rgb/a values which means they will be our inputs. I will import the
          inputs from the scikit-learn library. By setting `as_frame` to false
          and parser to `liac-arff`, the training_images/training_labels will be
          arrays and the data will only contain numerical values. The
          training_labels correspond to each image so that we can verify our
          results.
        </p>
        <p>image of normalising image data</p>
        <p>
          An important step with our image data is to normalise the values (put
          into a [0,1] range). There are a number of reasons for this, it
          ensures a consistent scale across all input features, helps gradient
          descent algorithms, and works better with activation functions. We
          will look at gradient descent and activation functions later on.
        </p>
        <p>
          In terms of the output to our NN it will be a single vector with the
          number of possible digits as its length. When we begin training, we
          should think of the NN as a baby with very little idea as to what the
          digit is. However, eventually the NN should learn about the images and
          produce high confidence values (~1) for the digit it determines as
          correct and low confidence values for all the other digits (~0). Below
          I have depicted a simple NN with the inputs and outputs we have
          described.
        </p>
        <p>image of NN with normalised input and vector output</p>
        <h3>Neural Network Layers</h3>
        <p>
          Currently, our image of the network shows a number of layers each with
          lots of neurons and connections between them. I will start by focusing
          on a single layer in the network. There are different types of layers,
          the main one to think about is a fully connected layer. As the name
          suggests, every neuron from the previous layer has a connection with
          each neuron of the current layer. Each neuron simply holds a 'weight'
          value for each of the previous neurons and also a single 'bias' value.
          So the input to a single neuron are all the outputs from all the
          previous neurons (lets call this `x`). The output of a neuron though
          is an affine transformation where we multiply the `x` with the weight
          values and then add the bias value afterwards. 
        </p>
        <p>image of a single layer where you can see the input and output</p>
        <p>
          I have already mentioned there are multiple types of layers so I will
          begin by creating an abstract class for a layer. It will define the
          function signatures and the main instance variables associated with a
          layer.
        </p>
        <p>image of layer class</p>
        <p>
          I have defined a function signature for `feed_forward`, which takes a
          matrix and outputs a matrix. This will be defined for each type of
          layer and represents the flow of data through a single layer.
        </p>
        <p>image of dense layer class</p>
        <p>
          Here I have defined the FullyConnected class as a child of Layer. We
          have two parameters: input_size - number of neurons in previous layer,
          output_size - number of neurons for the current layer. We call the
          parent's constructor and then initialise the weights and bias
          matrices. Initialising weights is a nice topic to research after
          completing the program and there are specific pros, cons and synergies
          with activation functions that should be known. Here, I decided to use
          the He initialisation which takes a normal distribution but shifts the
          variance to be 2.0 / input_size. The bias values are initialised to 1
          as the randomness is handled with the weights.
        </p>
        <p>image of feedforward for fully</p>
        <p>
          As I described earlier, the inputs are turned into the outputs via an
          affine transformation. Given the input values, we can simply perform a
          dot product between them and the weights and follow up with an
          addition translation. Remember, for a single neuron, we want to
          multiply the input values with each of the weight values that neuron
          holds. So for all neurons of a layer, we can perform a dot product to
          effectively apply that which is a supported operation for numpy
          arrays. Below shows how this looks like in matrix form:
        </p>
        <p>image of matrix form of the computation here</p>
        <p>
          There is another type of layer, which I have mentioned before, called
          activation layers. These are quite simple in that they just apply a
          transformation function on each input. This is needed because...
          The actual function applied is not pre-determined, just like the
          weight initialisation it must be chosen based on context and synergies.
        </p>
        <p>image of activation functions</p>
        <p>
          To handle any type of activation function, I will define an interface
          that can contain many different activation functions for testing. The
          one I will go for is the ReLU (Rectified Linear Unit), which simply
          allows positive values to pass through unchanged while setting all
          negative values to zero, this is done by returning the maximum between
          0 and the value. I have also included the softmax activation layer
          which will be used as the output layer. There are many others, each
          with their own properties. You will also notice the use of the derived
          version of these functions being defined. I didn't want to go back and
          forth with the code, so I have included it here, but this will become
          more relevant later on.
        </p>
        <p>image of activation layer</p>
        <p>
          For the actual activation layer class, we will take the activation
          function reference and its derived function reference as instance
          variables. And in the `feed_forward` function, we simply apply the
          activation function onto the input and return that result.
        </p>
        <h3>Putting it together</h3>
        <p>image of Neural Network</p>
        <p>
          We have nearly reached the halfway point. I have defined the actual NN
          class which maintains a list of layers, a function to add a layer, and
          a function to return the final output for a given input. It seems
          strange to have `output = input_data` but think of the function being
          performed in steps. First we have the input, then we pass it through
          the layers by looping through them, and finally we return that array.
          So the `output` variable is named after its use as the returned output
          from the NN.
        </p>
        <h2>Creating the Neural Network</h2>
        <p>image of creating NN and stuff</p>
        <p>
          I have instantiated a NN object and added a few fully connected layers
          with activation layers in between them. Notice how the output to one
          fully connected layer must match the size of the input for the next.
          This also applies to the final layer which must have a size of 10, as
          there are 10 different digits. I have also passed the activation and
          derived activation function references through the constructor which
          can easily be changed to `*ActivationFunctions.use_tan()` if that was
          the desired activation function. Now if I was to print the network's
          predict function, it would likely give me some bs like [[ 0.27 -0.14
          -0.55 -0.19 -0.06 0.09 -0.95 0.44 -1.02]]. This is the output of the
          NN with the first image with random weights. Clearly, it has no idea
          what the image is. Lets fix that.
        </p>
        <h3>Training</h3>
        <p>image of cost function - have the random output next to desired output</p>
        <p>
          In order to improve a model, you need to first figure out how to
          measure the success of the model. We know the exact digit value for
          each image - inside training_labels. So the next step is to derive a
          cost function that compares the produced result with the desired one.
        </p>
        <p>image of cost functions</p>
        <p>
          I have defined the cost function similarly to the Activation
          Functions, where we require both the standard and its derived form.
          The reason we define the derived form is that it enables us to carry
          out gradient descent. This optimisation algorithm uses the gradient of
          the cost function to figure out how we need to adjust the parameters
          in order to reduce said cost.
        </p>

        <p>image of new neural network with cost also gradient descent image</p>
        <p>
          TALK ABOUT why gradient descent
        </p>

        <p>image of back propagation visual</p>
        <p>TALK ABOUT for back p explain</p>

        <p>image of bak p for full and activ</p>
        <p>TALK ABOUT for back p</p>

        <p>image of train function pt1</p>
        <p>
          TALK ABOUT each parameter. then why we segment them into different
          batches
        </p>
        <p>image of train function pt2</p>
        <p>
          TALK ABOUT last little bit
        </p>
        <h3>Using the Neural Network to classify images</h3>
        <h2>Adivce</h2>
        <p>
          processes tokens sequentially with finite cost per token. therefore,
          letting the LLM 'think' through an answer can result in better
          answers. this is the same as asking for the answer through code, where
          the model can perform better. the model will run the code separately
          and return the answer. The cognition of the LLM is different to that
          of you and I. Problems can be difficult for the LLM that are trivial
          to us and vice versa.
        </p>
        <p>References</p>
        <li id="fn-1">
          {" "}
          <a 
            href="https://en.wikipedia.org/wiki/MNIST_database"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            MNIST database{" "}
          </a>
          <a href="#ref-1" className="footnote">
            ↩
          </a>
        </li>
        <li id="fn-2">
          {" "}
          <a 
            href="https://numpy.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footnote"
          >
            Numpy{" "}
          </a>
          <a href="#ref-2" className="footnote">
            ↩
          </a>
        </li>
        <p>_</p>
      </div>
    </div>
  );
}
