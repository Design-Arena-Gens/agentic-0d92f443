'use client'

import { useState, useCallback, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Phone, Mic, MessageSquare, Brain, CheckCircle, Play, RotateCcw } from 'lucide-react'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Initiate Call</span>
        </div>
      )
    },
    position: { x: 250, y: 0 },
    style: { background: '#4ade80', border: '2px solid #22c55e', padding: 10 },
  },
  {
    id: '2',
    data: {
      label: (
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4" />
          <span>Listen to Feedback</span>
        </div>
      )
    },
    position: { x: 250, y: 100 },
    style: { background: '#60a5fa', border: '2px solid #3b82f6', padding: 10 },
  },
  {
    id: '3',
    data: {
      label: (
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span>AI Process Feedback</span>
        </div>
      )
    },
    position: { x: 250, y: 200 },
    style: { background: '#a78bfa', border: '2px solid #8b5cf6', padding: 10 },
  },
  {
    id: '4',
    data: {
      label: (
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>Generate Response</span>
        </div>
      )
    },
    position: { x: 250, y: 300 },
    style: { background: '#fb923c', border: '2px solid #f97316', padding: 10 },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: (
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Complete Call</span>
        </div>
      )
    },
    position: { x: 250, y: 400 },
    style: { background: '#f472b6', border: '2px solid #ec4899', padding: 10 },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#22c55e', strokeWidth: 2 }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#8b5cf6', strokeWidth: 2 }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#f97316', strokeWidth: 2 }
  },
  {
    id: 'e5-2',
    source: '5',
    target: '2',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '5,5' },
    label: 'Continue conversation'
  },
]

interface CallLog {
  timestamp: string
  step: string
  message: string
  type: 'info' | 'success' | 'warning'
}

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [conversationCount, setConversationCount] = useState(0)
  const [customerInput, setCustomerInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addLog = (step: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setCallLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      step,
      message,
      type
    }])
  }

  const simulateCall = async () => {
    setIsRunning(true)
    setCallLogs([])
    setConversationCount(0)
    setCustomerInput('')
    setAiResponse('')

    // Step 1: Initiate Call
    setCurrentStep(1)
    addLog('Initiate Call', 'Dialing customer: +1 (555) 123-4567', 'info')
    await new Promise(resolve => setTimeout(resolve, 1500))
    addLog('Initiate Call', 'Call connected successfully', 'success')
    addLog('Initiate Call', 'AI: "Hello! This is an automated call from our service. How can I help you today?"', 'info')

    // Simulate conversation loop
    for (let i = 0; i < 3; i++) {
      setConversationCount(i + 1)

      // Step 2: Listen to Feedback
      setCurrentStep(2)
      await new Promise(resolve => setTimeout(resolve, 2000))
      const customerResponses = [
        "I'm having issues with my recent order. It hasn't arrived yet.",
        "My order number is ORD-12345. I ordered it 2 weeks ago.",
        "Yes, please. Thank you for your help!"
      ]
      const customerMsg = customerResponses[i]
      setCustomerInput(customerMsg)
      addLog('Listen to Feedback', `Customer: "${customerMsg}"`, 'info')

      // Step 3: AI Process Feedback
      setCurrentStep(3)
      await new Promise(resolve => setTimeout(resolve, 1500))
      addLog('AI Process Feedback', 'Analyzing customer sentiment: Concerned', 'info')
      addLog('AI Process Feedback', 'Detecting intent: Order inquiry', 'info')
      addLog('AI Process Feedback', 'Processing natural language...', 'info')

      // Step 4: Generate Response
      setCurrentStep(4)
      await new Promise(resolve => setTimeout(resolve, 1500))
      const aiResponses = [
        "I apologize for the inconvenience. Let me look into your order status right away. Can you provide me with your order number?",
        "Thank you! I've located order ORD-12345. I can see it's currently in transit and expected to arrive within 2 business days. I'll send you a tracking link via SMS. Is there anything else I can help you with?",
        "You're very welcome! Your tracking number has been sent to your phone. Have a great day!"
      ]
      const aiMsg = aiResponses[i]
      setAiResponse(aiMsg)
      addLog('Generate Response', `AI: "${aiMsg}"`, 'success')

      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Step 5: Complete Call
    setCurrentStep(5)
    await new Promise(resolve => setTimeout(resolve, 1000))
    addLog('Complete Call', 'Call ended gracefully', 'success')
    addLog('Complete Call', 'Total conversation exchanges: 3', 'success')
    addLog('Complete Call', 'Customer satisfaction score: 95%', 'success')

    setIsRunning(false)
    setCurrentStep(0)
  }

  const resetWorkflow = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setCallLogs([])
    setConversationCount(0)
    setCustomerInput('')
    setAiResponse('')
  }

  // Highlight active node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          opacity: currentStep === 0 ? 1 : parseInt(node.id) === currentStep ? 1 : 0.4,
          transform: parseInt(node.id) === currentStep ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
        },
      }))
    )
  }, [currentStep, setNodes])

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Phone className="w-6 h-6 text-green-600" />
              AI Calling Automation Workflow
            </h1>
            <p className="text-sm text-gray-600 mt-1">N8N-style automation for intelligent call handling</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={simulateCall}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                isRunning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Workflow'}
            </button>
            <button
              onClick={resetWorkflow}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-4 p-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        <div className="w-96 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="font-bold text-lg mb-3 text-gray-800">Workflow Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${isRunning ? 'text-green-600' : 'text-gray-400'}`}>
                  {isRunning ? 'Active' : 'Idle'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Step:</span>
                <span className="font-semibold text-blue-600">
                  {currentStep === 0 ? 'None' : nodes.find(n => n.id === currentStep.toString())?.data.label.props.children[1].props.children || 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exchanges:</span>
                <span className="font-semibold text-purple-600">{conversationCount}</span>
              </div>
            </div>
          </div>

          {(customerInput || aiResponse) && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Current Conversation</h3>
              {customerInput && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs font-semibold text-blue-600 mb-1">CUSTOMER</div>
                  <div className="text-sm text-gray-800">{customerInput}</div>
                </div>
              )}
              {aiResponse && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-xs font-semibold text-green-600 mb-1">AI ASSISTANT</div>
                  <div className="text-sm text-gray-800">{aiResponse}</div>
                </div>
              )}
            </div>
          )}

          <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col">
            <h3 className="font-bold text-lg mb-3 text-gray-800">Call Logs</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {callLogs.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  No logs yet. Click "Run Workflow" to start.
                </div>
              ) : (
                callLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg text-xs border ${
                      log.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : log.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                        : 'bg-blue-50 border-blue-200 text-blue-800'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold">{log.step}</span>
                      <span className="text-gray-500">{log.timestamp}</span>
                    </div>
                    <div>{log.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
